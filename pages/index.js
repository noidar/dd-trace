import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const Homepage = () => {
    const { t } = useTranslation("common");

    return (
        <>
            <main>
                <Header heading={t("h1")} title={t("title")} />

                <Link href="/de/home?ReturnUrl=dasd">
                    <button type="button">{"/de/home?ReturnUrl=dasd"}</button>
                </Link>
                {/* 
               the problem is when click to this, it goes on http://localhost:3001/de/home?ReturnUrl=dasd 
               instead of http://localhost:3001/de/de/home?ReturnUrl=dasd */}

                <Link href="/at/home?ReturnUrl=dasd">
                    <button type="button">{"/at/home?ReturnUrl=dasd"}</button>
                </Link>
            </main>
            <Footer />
        </>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common", "footer"])),
    },
});

export default Homepage;
