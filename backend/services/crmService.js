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

// 👇 --- תיקון כאן --- 👇
const parseStringToBoolean = (str) => {
    // אם הערך ריק, החזר null כדי שה-frontend ידע להציג "-"
    if (str === null || str === undefined || str === '') return null; 
    return String(str).toLowerCase() === 'true' || String(str) === '1';
};

// 👇 --- ותיקון כאן --- 👇
const parseYesNoToBoolean = (textValue) => {
    // אם הערך ריק, החזר null
    if (textValue === null || textValue === undefined || textValue === '') return null;
    const lowerText = String(textValue).toLowerCase();
    return lowerText === 'כן' || lowerText === 'יש';
};

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
 
    const isSoldOrRented = parseStringToBoolean(xmlProperty.gishaYN);
 
    const isPropertyAccessible = false;
 
    const baseTransactionAction = String(xmlProperty.mainaction || '').trim();
    let displayTransactionType = baseTransactionAction;
 
    if (baseTransactionAction === 'למכירה') {
      displayTransactionType = 'מכירה';
    } else if (baseTransactionAction === 'להשכרה') {
      displayTransactionType = 'השכרה';
    }

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
      
      isAccessible: isPropertyAccessible,
      isRenovated: parseStringToBoolean(xmlProperty.meshupatsYN),
      hasBars: parseStringToBoolean(xmlProperty.soragimYN),
 
      description: xmlProperty.comments2 || '',
      images: images,
      agentName: xmlProperty.agent || (agentProfileData ? agentProfileData.agent : null),
      agentPhone: agentProfileData ? agentProfileData.agentTel1 : null,
      isSoldOrRented: isSoldOrRented,
      
      evacuationDate: xmlProperty.removal || null,
      directions: xmlProperty.direct || null,
      boiler: xmlProperty.boiler || null,
      
      officeDetails: officeProfileData || null
    };
  };
  
  async function fetchAndProcessProperties() {
    if (!CRM_XML_URL || CRM_XML_URL === "כאן_יבוא_ה-URL_של_קובץ_ה-XML_שלך") {
        console.error("CRM_XML_URL is not configured properly in .env file.");
        throw new Error("CRM XML URL not configured.");
    }

    try {
        console.log(`Fetching XML from: ${CRM_XML_URL}`);
        const response = await axios.get(CRM_XML_URL, { responseType: 'text' });
        const xmlData = response.data;
        console.log("XML data fetched successfully.");

        const parser = new xml2js.Parser({
            explicitArray: false,
            trim: true,
        });

        const result = await parser.parseStringPromise(xmlData);

        if (result && result.NewDataSet) {
            const propertiesData = result.NewDataSet.Properties;
            const picturesData = result.NewDataSet.pictures;
            const officeProfile = result.NewDataSet.officeProfile;
            const agentProfile = result.NewDataSet.officeAgentsProfile;
            
            const listingsArray = ensureArray(propertiesData);
            const picturesArray = ensureArray(picturesData);

            if (listingsArray.length === 0 || (listingsArray.length === 1 && Object.keys(listingsArray[0]).length === 0)) {
                console.warn("No 'Properties' items found in NewDataSet or 'Properties' is empty.");
                return [];
            }
            
            const mappedProperties = listingsArray.map(prop => mapNewXmlPropertyToModel(prop, picturesArray, officeProfile, agentProfile)).filter(p => p !== null && p.id !== null);
            
            console.log(`Mapped ${mappedProperties.length} properties.`);

            // 👇 --- הוספנו את ההדפסה הזו כדי לראות את הנתונים --- 👇
            if (mappedProperties.length > 0) {
              console.log("Data of the first property:", JSON.stringify(mappedProperties[0], null, 2));
            }
            
            return mappedProperties;
        } else {
            console.warn("No NewDataSet found in XML or 'NewDataSet' is empty.");
            return [];
        }
    } catch (error) {
        console.error('Error in fetchAndProcessProperties:', error.message, error.stack);
        throw error;
    }
}

module.exports = { fetchAndProcessProperties };