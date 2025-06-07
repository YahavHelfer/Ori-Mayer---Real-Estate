// frontend/src/pages/_app.tsx
import type { AppProps } from 'next/app';
import Layout from '../components/Layout'; // ייבוא מהתיקייה שיצרנו
import 'leaflet/dist/leaflet.css'; // <<< הוסף את השורה הזו
import "slick-carousel/slick/slick.css";          // <<< הוסף את זה
import "slick-carousel/slick/slick-theme.css";    // <<< הוסף א
import '../styles/globals.css'; // ודא שהנתיב לקובץ ה-CSS הגלובלי שלך נכון
import "yet-another-react-lightbox/styles.css";



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;