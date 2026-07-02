import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function CalendarPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <h1 className="font-serif text-2xl font-semibold">Calendrier</h1>;
}
