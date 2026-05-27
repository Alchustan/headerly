import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

type MetadataResult = {
  title: string;
  description: string;
  alternates: {
    canonical: string;
    languages: Record<string, string>;
  };
  openGraph: {
    title: string;
    description: string;
  };
  twitter: {
    title: string;
    description: string;
  };
};

export async function generatePageMetadata(
  locale: string,
  namespace: string,
  slug: string,
): Promise<MetadataResult> {
  const t = await getTranslations({ locale, namespace });

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    if (loc === routing.defaultLocale) {
      languages['x-default'] = slug || '/';
      languages[loc] = slug || '/';
    } else {
      languages[loc] = `/${loc}${slug}`;
    }
  }

  const canonical = `/${locale === routing.defaultLocale ? '' : locale}${slug}`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
    twitter: {
      title: t('title'),
      description: t('description'),
    },
  };
}
