import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Homepage = () => {
    const router = useRouter();
    const { t } = useTranslation("common");

    return (
        <>
            <main>
                <h1>PAGE under Country</h1>
                <button onClick={() => router.push("/")}>{"go to /"}</button>
            </main>
        </>
    );
};

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common", "footer"])),
    },
});

export default Homepage;
