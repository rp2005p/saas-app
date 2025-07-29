import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { getAllCompanions, getRecentSessions, getBookmarkedCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
    const user = await currentUser();

    const companions = await getAllCompanions({ limit: 3 });
    const recentSessionsCompanions = await getRecentSessions(10);

    // fetch user's bookmarks
    const bookmarkedCompanions = user
        ? await getBookmarkedCompanions(user.id)
        : [];

    return (
        <main>
            <h1>Popular Companions</h1>

            <section className="home-section">
                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                        // mark as bookmarked if companion is in bookmarks
                        bookmarked={bookmarkedCompanions.some((b) => b.id === companion.id)}
                    />
                ))}
            </section>

            <section className="home-section">
                <CompanionsList
                    title="Recently completed sessions"
                    companions={recentSessionsCompanions}
                    classNames="w-2/3 max-lg:w-full"
                />
                <CTA />
            </section>
        </main>
    );
};

export default Page;
