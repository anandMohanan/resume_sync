import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureProps {
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    title: "Resume Organization",
    description:
      "Effortlessly organize multiple versions of your resume, ensuring you always present the most relevant information and ease of access",
  },
  {
    title: "Application Tracking",
    description:
      "Track the status of your job applications, with detailed insights into each stage of the hiring process.",
  },
  {
    title: "Community Engagement",
    description:
      "Connect with a diverse community of professionals for advice, support, and networking opportunities.Share insights, tips, and thoughts on career development with fellow members, fostering collaboration and growth.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center p-10">
        Simple yet {""}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          effective
        </span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description }: FeatureProps) => (
          <Card key={title} className="dark:bg-background">
            <CardHeader>
              <CardTitle className="underline">{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            {/* <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter> */}
          </Card>
        ))}
      </div>
    </section>
  );
};
