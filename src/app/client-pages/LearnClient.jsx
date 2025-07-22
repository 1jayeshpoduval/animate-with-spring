"use client";
import Container from "@/components/ContainerTool";
import { ArrowUpRight, Lightbulb, Play, Square } from "lucide-react";
import springFactors from "@/data/springFactors";
import { motion } from "motion/react";
import useBallX from "@/hooks/useBallX";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const LearnClient = () => {
  const [factors, setFactors] = useState(springFactors);

  const [resources, setResources] = useState([]);

  const { ballTravelDistance, dottedLineRef } = useBallX();

  const handleAnimationClick = (springFactor, animationType) => {
    setFactors((prevFactor) =>
      prevFactor.map((factor) =>
        factor.key === springFactor.key
          ? {
              ...factor,
              [animationType]: {
                ...factor[animationType],
                toggle: !factor[animationType].toggle,
              },
            }
          : factor,
      ),
    );
  };

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => {
        setResources(data.resources);
      })
      .catch((err) => {
        console.error("Error fetching resources", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <main>
      <section className="mt-12 md:mt-28">
        <Container className="@container/Learn">
          <div className="flex flex-col gap-8">
            <h1 className="font-sans text-2xl font-semibold tracking-tight @md/Learn:max-w-[25ch]">
              What does mass, stiffness, and damping really mean?
            </h1>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Mass</span>
                <p className="max-w-[60ch]">
                  Imagine a ball. Mass is like the weight of that ball.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Stiffness</span>
                <p className="max-w-[50ch]">
                  Now imagine the ball is attached to a spring. Stiffness is how
                  strongly the spring tries to pull the ball back to where it
                  started.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Damping</span>
                <p className="max-w-[50ch]">
                  Damping is like friction. It decides how much bounce the
                  spring loses over time. Zero damping means the spring never
                  stops springing.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-4">
        <Container className="@container/Learn">
          <div className="text-secondary relative my-4 ml-4 max-w-[45ch] rounded-lg bg-[#FDEDED] py-4 pr-2 pl-6 font-medium md:my-8">
            <p>
              The spring motion{" "}
              <span className="font-semibold italic">always</span> depends on
              how mass, stiffness, and damping work{" "}
              <span className="font-semibold italic">together</span>. It’s the
              mix that decides whether an animation feels playful, snappy,
              smooth or heavy.
            </p>
            <div className="bg-secondary absolute -top-3 -left-3 rounded-full p-1">
              <Lightbulb color="white" size={20} />
            </div>
          </div>
        </Container>
      </section>
      <section className="py-4">
        <Container className="@container/Learn">
          <div className="mb-12 flex flex-col gap-8">
            <h2 className="font-sans text-xl font-semibold tracking-tight @md/Learn:max-w-[30ch]">
              What makes a spring animation tasteful?
            </h2>
            <div className="grid grid-cols-4 gap-y-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-32">
              {/* Map over effects as it holds the springEffects */}
              {factors.map((factor) => (
                <div
                  className="col-span-4 flex flex-col gap-8 md:col-span-8 md:flex md:flex-row lg:col-span-12"
                  key={factor.key}
                >
                  <div className="flex w-full flex-col gap-2" key={factor.key}>
                    <span className="font-semibold">{factor.factorName}</span>
                    <span className="text-primary/50 w-full max-w-[45ch]">
                      {factor.description}
                    </span>
                  </div>
                  {factor.tasteful.key && factor.tasteless.key && (
                    <div className="row-span-2 grid w-full grid-rows-subgrid gap-4">
                      <div className="relative flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-50">
                        <Button
                          className="absolute bottom-4 left-4 size-8 !p-2"
                          variant="secondary"
                          asChild
                          onClick={() =>
                            handleAnimationClick(factor, "tasteless")
                          }
                        >
                          {factor.tasteless.toggle ? (
                            <Square fill="black" size={20} />
                          ) : (
                            <Play fill="black" size={20} />
                          )}
                        </Button>
                        <span className="text-primary/50 absolute top-4 right-4 text-sm font-medium">
                          Tasteless
                        </span>
                        <div
                          className="relative h-[1px] w-[65%] bg-[url('/dotted-line.svg')] bg-repeat"
                          ref={dottedLineRef}
                        >
                          <motion.div
                            className="bg-secondary absolute top-1/2 size-8 -translate-[16px] rounded-full"
                            /* To force kill the animation */
                            key={
                              factor.tasteless.toggle
                                ? `playing-${factor.key}-${factor.tasteless.key}`
                                : `killed-${factor.key}-${factor.tasteless.key}`
                            }
                            initial={{ x: 0 }}
                            animate={{
                              x: factor.tasteless.toggle
                                ? ballTravelDistance
                                : 0,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: `${factor.tasteless.stiffness}`,
                              damping: `${factor.tasteless.damping}`,
                              mass: `${factor.tasteless.mass}`,
                              repeat: Infinity,
                              repeatType: "mirror",
                            }}
                          ></motion.div>
                        </div>
                      </div>
                      <div className="relative flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-50">
                        <Button
                          className="absolute bottom-4 left-4 size-8 !p-2"
                          variant="secondary"
                          asChild
                          onClick={() =>
                            handleAnimationClick(factor, "tasteful")
                          }
                        >
                          {factor.tasteful.toggle ? (
                            <Square fill="black" size={20} />
                          ) : (
                            <Play fill="black" size={20} />
                          )}
                        </Button>
                        <span className="absolute top-4 right-4 text-sm font-medium text-[#4769FF]">
                          Tasteful
                        </span>
                        <div
                          className="relative h-[1px] w-[65%] bg-[url('/dotted-line.svg')] bg-repeat"
                          ref={dottedLineRef}
                        >
                          <motion.div
                            className="bg-secondary absolute top-1/2 size-8 -translate-[16px] rounded-full"
                            /* To force kill the animation */
                            key={
                              factor.tasteful.toggle
                                ? `playing-${factor.key}-${factor.tasteful.key}`
                                : `killed-${factor.key}-${factor.tasteful.key}`
                            }
                            initial={{ x: 0 }}
                            animate={{
                              x: factor.tasteful.toggle
                                ? ballTravelDistance
                                : 0,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: `${factor.tasteful.stiffness}`,
                              damping: `${factor.tasteful.damping}`,
                              mass: `${factor.tasteful.mass}`,
                              repeat: Infinity,
                              repeatType: "mirror",
                            }}
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="py-4">
        <Container className="@container/Learn">
          <div className="mb-12 flex flex-col gap-8">
            <h2 className="font-sans text-xl font-semibold tracking-tight @md/Learn:max-w-[30ch]">
              Here are some awesome resources to learn more about spring
              animations.
            </h2>
            <ul className="flex flex-col gap-4">
              {resources.map((resource) => (
                <li
                  className="text-primary/50 hover:text-primary flex items-center gap-2 font-medium hover:underline"
                  key={resource.url}
                >
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource.title}
                    <ArrowUpRight
                      size={20}
                      className="ml-1 inline align-text-top" /* Inline makes the icon wrap with the text */
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default LearnClient;
