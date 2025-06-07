// backend/services/crmService.js
const axios = require('axios');
const xml2js = require('xml2js');

const CRM_XML_URL = process.env.CRM_XML_URL;

const ensureArray = (item) => {
    if (!item) return [];
    if (Array.isArray(item)) return item;
    return [item];
};

// פונקציות עזר להמרות
const safeParseFloat = (val) => {
    if (val === null || val === undefined || val === '') return null;
    const num = parseFloat(String(val));
    return isNaN(num) ? null : num;
};

const safeParseInt = (val) => {
    if (val === null || val === undefined || val === '') return null;
    const num = parseInt(String(val), 10);
    return isNaN(num) ? null : num;
};

const parseStringToBoolean = (str) => {
    if (str === null || str === undefined) return false; // או null, תלוי בדרישה
    return String(str).toLowerCase() === 'true';
};

const parseYesNoToBoolean = (textValue) => {
    if (typeof textValue !== 'string') return false;
    const lowerText = textValue.toLowerCase();
    return lowerText === 'כן' || lowerText === 'יש';
};


// הפונקציה מקבלת את אובייקט הנכס מה-XML, את כל מערך התמונות, ואת פרטי המשרד
// backend/services/crmService.js

// ... (שאר פונקציות העזר כמו ensureArray, safeParseFloat, safeParseInt, parseStringToBoolean, parseYesNoToBoolean נשארות כפי שהן) ...

// הפונקציה מקבלת את אובייקט הנכס מה-XML, את כל מערך התמונות, ואת פרטי המשרד והסוכן
const mapNewXmlPropertyToModel = (xmlProperty, allPicturesFromServer, officeProfileData, agentProfileData) => {
    if (!xmlProperty) return null;
  
    const propertyId = String(xmlProperty.serial || new Date().getTime()); // ID הנכס
  
    let images = [];
    if (allPicturesFromServer && allPicturesFromServer.length > 0) {
      images = allPicturesFromServer
        .filter(pic => String(pic.picserial) === propertyId)
        .map(pic => pic.picurl)
        .filter(url => url && typeof url === 'string');
    }
  
    // --- שינוי כאן: קביעת isSoldOrRented על בסיס gishaYN ---
    // ההנחה היא ש-gishaYN יהיה "true" (כמחרוזת) אם הנכס נמכר/הושכר
    // ו-"false" (כמחרוזת) או לא קיים/ריק אם הנכס זמין.
    // אם gishaYN מייצג במקור נגישות לנכים, ועכשיו משתמשים בו לסימון מכירה,
    // נצטרך לוודא שהערך המקורי של נגישות לנכים נשמר בשדה אחר או לא רלוונטי יותר.
    const isSoldOrRented = parseStringToBoolean(xmlProperty.gishaYN);
  
    // קביעת isAccessible המקורי (נגישות לנכים)
    // נצטרך להחליט אם השדה gishaYN המקורי עדיין רלוונטי להצגה,
    // ואם כן, מאיפה לקחת את הנתון הזה עכשיו אם gishaYN משמש לסטטוס מכירה.
    // כרגע, נניח ש-gishaYN *רק* משמש לסטטוס מכירה, והמידע על נגישות לא קיים יותר או לא רלוונטי.
    // אם עדיין צריך להציג נגישות, תצטרך שדה אחר ב-XML עבור זה.
    const isPropertyAccessible = false; //  הנחה זמנית, ראה הערה למעלה
  
    const baseTransactionAction = String(xmlProperty.mainaction || '').trim();
    let displayTransactionType = baseTransactionAction;
  
    if (baseTransactionAction === 'למכירה') {
      displayTransactionType = 'מכירה';
    } else if (baseTransactionAction === 'להשכרה') {
      displayTransactionType = 'השכרה';
    }
    //  אם הנכס נמכר (isSoldOrRented = true), יכול להיות שנרצה ש-displayTransactionType יהיה "נמכר" או "הושכר"
    //  בהתאם ל-mainaction המקורי. כרגע הוא יישאר "מכירה" או "השכרה".
    //  לדוגמה, אם isSoldOrRented=true ו-baseTransactionAction="מכירה", אז displayTransactionType="מכירה" (אולי עדיף "נמכר"?)
  
    const city = xmlProperty.city || '';
    const street = xmlProperty.street || '';
    let fullAddress = `${street}, ${city}`.replace(/ ,|,$/g, '').replace(/^, /g, '').trim();
    if (fullAddress === ',' || fullAddress === '') fullAddress = city;
  
    return {
      id: propertyId,
      transactionType: displayTransactionType,
      propertyType: xmlProperty.objecttype || null,
      city: city,
      neighborhood: xmlProperty.shcuna || null,
      street: street,
      houseNumber: null,
      fullAddress: fullAddress,
      price: safeParseFloat(xmlProperty.priceshekel),
      currency: 'ש"ח',
      rooms: safeParseFloat(xmlProperty.room),
      floor: safeParseInt(xmlProperty.floor),
      totalFloors: safeParseInt(xmlProperty.floors),
      area: safeParseFloat(xmlProperty.builtsqmr),
      
      hasBalcony: parseStringToBoolean(xmlProperty.mirpesetShemeshYN),
      hasParking: parseYesNoToBoolean(xmlProperty.park),
      hasElevator: parseYesNoToBoolean(String(xmlProperty.lift).split('/')[0]),
      numberOfElevators: String(xmlProperty.lift).includes('/') ? safeParseInt(String(xmlProperty.lift).split('/')[1]) : (parseYesNoToBoolean(xmlProperty.lift) ? 1: 0),
      hasAirConditioning: parseYesNoToBoolean(String(xmlProperty.a_c).split('/')[0]),
      airConditioningType: String(xmlProperty.a_c).includes('/') ? String(xmlProperty.a_c).split('/')[1] : null,
      hasStorage: parseStringToBoolean(xmlProperty.machsanYN),
      hasSecureRoom: parseStringToBoolean(xmlProperty.mamadYN),
      
      isAccessible: isPropertyAccessible, // <<< הערך המקורי של נגישות, אם עדיין רלוונטי ויש לו מקור אחר
      isRenovated: parseStringToBoolean(xmlProperty.meshupatsYN),
      hasBars: parseStringToBoolean(xmlProperty.soragimYN),
  
      description: xmlProperty.comments2 || '',
      images: images,
      agentName: xmlProperty.agent || (agentProfileData ? agentProfileData.agent : null),
      agentPhone: agentProfileData ? agentProfileData.agentTel1 : null,
      isSoldOrRented: isSoldOrRented, // <<< זה עכשיו מבוסס על gishaYN
      
      evacuationDate: xmlProperty.removal || null,
      directions: xmlProperty.direct || null,
      boiler: xmlProperty.boiler || null,
      
      officeDetails: officeProfileData || null
    };
  };
  
  // ... (שאר הקובץ crmService.js, כולל fetchAndProcessProperties, נשאר אותו דבר) ...
async function fetchAndProcessProperties() {
    // ... (קוד משיכת ה-XML ו-parser נשאר דומה)
    if (!CRM_XML_URL || CRM_XML_URL === "כאן_יבוא_ה-URL_של_קובץ_ה-XML_שלך") { // וכו'
        console.error("CRM_XML_URL is not configured properly in .env file.");
        throw new Error("CRM XML URL not configured.");
    }

    try {
        console.log(`Workspaceing XML from: ${CRM_XML_URL}`);
        const response = await axios.get(CRM_XML_URL, { responseType: 'text' });
        const xmlData = response.data;
        console.log("XML data fetched successfully.");

        const parser = new xml2js.Parser({
            explicitArray: false,
            trim: true,
        });

        const result = await parser.parseStringPromise(xmlData);
        // אין צורך להדפיס את כל ה-JSON כל פעם, אלא אם כן יש בעיות חדשות. אפשר להפוך להערה.
        // console.log("XML parsed successfully. Full structure:", JSON.stringify(result, null, 2));

        if (result && result.NewDataSet) {
            const propertiesData = result.NewDataSet.Properties;
            const picturesData = result.NewDataSet.pictures;
            const officeProfile = result.NewDataSet.officeProfile; // שמירת פרטי המשרד
            const agentProfile = result.NewDataSet.officeAgentsProfile; // שמירת פרטי הסוכן הכלליים
            
            const listingsArray = ensureArray(propertiesData);
            const picturesArray = ensureArray(picturesData);

            if (listingsArray.length === 0 || (listingsArray.length === 1 && Object.keys(listingsArray[0]).length === 0)) {
                // בדיקה אם listingsArray מכיל אובייקט ריק אם Properties לא קיים או ריק ב-XML
                console.warn("No 'Properties' items found in NewDataSet or 'Properties' is empty.");
                return [];
            }
            
            // אם רוצים לראות את מבנה התמונה הראשונה, אפשר להשאיר את זה (להפוך להערה אחרי שזה עובד)
            // if (picturesArray.length > 0) {
            //     console.log("Detailed structure of the first picture object (if exists):", JSON.stringify(picturesArray[0], null, 2));
            // } else {
            //     console.log("No 'pictures' array found or it is empty in NewDataSet.");
            // }

            const mappedProperties = listingsArray.map(prop => mapNewXmlPropertyToModel(prop, picturesArray, officeProfile, agentProfile)).filter(p => p !== null && p.id !== null);
            
            console.log(`Mapped ${mappedProperties.length} properties.`);
            return mappedProperties;
        } else {
            console.warn("No NewDataSet found in XML or 'NewDataSet' is empty.");
            return [];
        }
    } catch (error) {
        console.error('Error in fetchAndProcessProperties:', error.message, error.stack); // הדפסת ה-stack של השגיאה
        throw error;
    }
}

module.exports = { fetchAndProcessProperties };