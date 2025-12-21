import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================================================
  // Build Configuration
  // ============================================================================
  
  // Fix workspace root detection issue
  outputFileTracingRoot: import.meta.dirname,
  // Output standalone para otimização Docker
  output: 'standalone',
  // Disable source maps in production for smaller bundles
  productionBrowserSourceMaps: false,
  // Compress output
  compress: true,

  // ============================================================================
  // Image Optimization
  // ============================================================================
  images: {
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/images/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ============================================================================
  // Performance Optimizations (Turbopack compatible)
  // ============================================================================
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
    // Optimize package imports - tree-shake heavy libraries
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'recharts',
      '@radix-ui/react-accordion',
      '@radix-ui/react-tabs',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-avatar',
      '@radix-ui/react-popover',
      '@radix-ui/react-label',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-slot',
      '@radix-ui/react-select',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
      'embla-carousel-react',
      'react-hook-form',
    ],
    // Reduce legacy polyfills for modern browsers
    optimizeCss: true,
  },

  // ============================================================================
  // Turbopack Configuration (for dev mode)
  // ============================================================================
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
    resolveAlias: {},
  },

  // ============================================================================
  // Caching Headers for Static Assets
  // ============================================================================
  async headers() {
    return [
      {
        // Cache static assets for 1 year
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache optimized images
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },

  // ============================================================================
  // Compiler Optimizations (SWC - works with Turbopack)
  // ============================================================================
  compiler: {
    // Remove console.log in production
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },

  // ============================================================================
  // Webpack Configuration
  // ============================================================================
  webpack: (config, { isServer }) => {
    // Disable webpack cache to avoid build issues
    config.cache = false;

    // Optimize bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        canvas: false,
      };
    }

    return config;
  },

  // ============================================================================
  // TypeScript Configuration
  // ============================================================================
  typescript: {
    ignoreBuildErrors: true,
  },
};

// Integra plugin next-intl apontando para request config
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
export default withBundleAnalyzer(withNextIntl(nextConfig));
