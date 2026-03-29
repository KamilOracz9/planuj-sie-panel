import { getTranslations } from "next-intl/server";

export default async function Dashboard() {
  const t = await getTranslations();

  return (
    <div>{t('HomePage.title')}</div>
  );
}
