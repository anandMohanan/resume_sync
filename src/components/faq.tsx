import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
    question: string;
    answer: string;
    value: string;
}

const FAQList: FAQProps[] = [
    {
        question: "How can I get started with Resume Sync?",
        answer:
            "Getting started with Resume Sync is simple! Sign up for an account on our platform, and begin exploring the features. Whether you're looking to organize your resumes, track job applications, or engage with the community, Resume Sync offers everything you need to streamline your job search and take control of your professional journey.",
        value: "item-1",
    },
    {
        question: "How can I engage with the Resume Sync community?",
        answer:
            "Resume Sync fosters a vibrant community of professionals focused on career development. Users can engage with the community by participating in discussions, sharing insights, and seeking advice on various career-related topics. The platform provides a collaborative environment where members can learn from each other and build meaningful connections.",
        value: "item-2",
    },
    {
        question: "Is ResumeSync's file upload feature secure?",
        answer: "Yes, Resume Sync prioritizes the security of user data. The platform utilizes robust encryption protocols to ensure that files uploaded by users are protected both during transit and while at rest. Users can confidently upload their resumes and other documents, knowing that their information is secure.",
        value: "item-3",
    },
    {
        question: "How does Resume Sync help with resume organization?",
        answer:
            "Resume Sync offers intuitive tools for organizing your resumes. With features like version control and customizable tags, users can efficiently manage multiple resume versions, ensuring they always present the most relevant information to prospective employers.",
        value: "item-4",
    },
    {
        question: "Can I access my files from any device?",
        answer:
            "Yes, our platform is accessible from any device with an internet connection. Whether you're using a computer, tablet, or smartphone, you can log in to your account and access your files securely from anywhere, anytime.",
        value: "item-5",
    },
];

export const FAQ = () => {
    return (
        <section id="faq" className="container py-32 mb-10 sm:py-32 ">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    Questions
                </span>
            </h2>

            <Accordion type="single" collapsible className="w-full AccordionRoot">
                {FAQList.map(({ question, answer, value }: FAQProps) => (
                    <AccordionItem key={value} value={value}>
                        <AccordionTrigger className="text-left">
                            {question}
                        </AccordionTrigger>

                        <AccordionContent>{answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <h3 className="font-medium mt-4">
                Still have questions?{" "}
                <a
                    href="#"
                    className="text-primary transition-all border-primary hover:border-b-2"
                >
                    Contact us
                </a>
            </h3>
        </section>
    );
};
