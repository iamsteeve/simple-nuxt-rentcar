import Strapi from 'strapi-sdk-javascript';

class StrapiService {
    get Strapi(): Strapi {
        return this.strapiInstance;
    }
    public static getInstance() {
        if (!StrapiService.instance) {
            StrapiService.instance = new StrapiService();
            // ... any one time initialization goes here ...
        }
        return StrapiService.instance;
    }

    private static instance: StrapiService;

    private strapiInstance: Strapi;

    private constructor() {
        this.strapiInstance = new Strapi(process.env.SERVER_URL_PERICOS? process.env.SERVER_URL_PERICOS: `http://142.93.12.123:1337/`);
        // do something construct...
    }

}

export default StrapiService.getInstance();
