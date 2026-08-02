import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            // Document uploads go up to 20MB (see mimes:pdf,doc,... max:20480 in the API);
            // the framework default of 1MB is well under that.
            bodySizeLimit: '25mb',
        },
    },
};
 
const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');
export default withNextIntl(nextConfig);