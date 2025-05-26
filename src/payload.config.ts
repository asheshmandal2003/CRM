// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { Tenants } from './collections/Tenants'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Tenants],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    formBuilderPlugin({
      fields: {
        state: false,
        select: false,
        country: false,
        payment: false,
        checkbox: false,
        number: false,
        message: false,
      },
      formOverrides: {
        access: {
          create: ({ req }) => {
            return req.user?.role === 'super-admin' || req.user?.role === 'tenant-admin'
          },
          update: ({ req }) => {
            return req.user?.role === 'super-admin' || req.user?.role === 'tenant-admin'
          },
        },
      },
    }),
    multiTenantPlugin({
      collections: {
        forms: {
          useTenantAccess: true,
          useBaseListFilter: true,
        },
        'form-submissions': {
          useTenantAccess: true,
          useBaseListFilter: true,
        },
      },
      tenantField: {
        name: 'tenant',
        access: {
          create: ({ req }) => {
            return req.user?.role === 'super-admin' || req.user?.role === 'tenant-admin'
          },
          update: ({ req }) => {
            return req.user?.role === 'super-admin'
          },
        },
      },
      tenantsArrayField: {
        includeDefaultField: true,
        arrayFieldName: 'tenants',
        arrayTenantFieldName: 'tenant',
        rowFields: [
          {
            name: 'role',
            type: 'select',
            options: [
              { label: 'Admin', value: 'admin' },
              { label: 'Editor', value: 'editor' },
              { label: 'Viewer', value: 'viewer' },
            ],
            defaultValue: 'editor',
          },
        ],
      },

      tenantsSlug: 'tenants',
      userHasAccessToAllTenants: (user) => user?.role === 'super-admin',
    }),
  ],
})
