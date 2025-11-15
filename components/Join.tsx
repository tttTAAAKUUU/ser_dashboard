import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { Section, Container } from "@/components/craft";
import { Coins, ArrowRight } from "lucide-react";

type FeatureText = {
  icon: JSX.Element;
  title: string;
  description: string;
  href?: string;
  cta?: string;
};

const featureText: FeatureText[] = [
  {
    icon: <Coins className="h-6 w-6 text-primary" />,
    title: "Lorem Ipsum",
    href: "/",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    cta: "Learn More",
  },
  {
    icon: <Coins className="h-6 w-6 text-primary" />,
    title: "Lorem Ipsum",
    href: "/",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    cta: "Learn More",
  },
  {
    icon: <Coins className="h-6 w-6 text-primary" />,
    title: "Lorem Ipsum",
    href: "/",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    cta: "Learn More",
  },
  {
    icon: <Coins className="h-6 w-6 text-primary" />,
    title: "Lorem Ipsum",
    href: "/",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    cta: "Learn More",
  },
];

const Join = () => {
  return (
    <Section className="border-b bg-white">
      <Container>
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl font-semibold">
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Balancer>
          </h3>
          <h4 className="text-2xl font-light text-gray-600">
            <Balancer>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            </Balancer>
          </h4>

          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-4">
            {featureText.map(({ icon, title, description, href, cta }, i) => (
              <Link
                key={i}
                href={`${href}`}
                className="flex flex-col justify-between gap-6 rounded-lg border p-6 bg-white shadow-sm transition-all hover:-mt-2 hover:mb-2"
              >
                <div className="grid gap-4">
                  {icon}
                  <h4 className="text-xl text-primary font-semibold">
                    {title}
                  </h4>
                  <p className="text-base text-gray-600">{description}</p>
                </div>
                {cta && (
                  <div className="flex h-fit items-center text-sm font-semibold text-primary">
                    <p>{cta}</p>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Join;
