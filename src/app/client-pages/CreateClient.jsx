"use client";
import React, { useState, useEffect, useRef } from "react";
import Container from "@/components/ContainerTool";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import springTabs from "@/data/springTabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import useWindowSize from "@/hooks/useWindowSize";
import { toast } from "sonner";
import { Check, Copy } from "lucide-react";

const CreateClient = () => {
  const windowSize = useWindowSize(); // Dynamic window resize hook
  const [ballTravelDistance, setBallTravelDistance] = useState(0);

  // For dynamically updating sliders
  const [springValues, setSpringValues] = useState({
    mass: 1,
    stiffness: 100,
    damping: 10,
    bounce: 0.5,
    duration: 1,
  });

  const [springAnimation, setSpringAnimation] = useState(false);

  const [codeCopy, setCodeCopy] = useState(false);

  const dottedLineRef = useRef();

  const handlePlayButton = () => {
    setSpringAnimation(!springAnimation);
  };

  const handleKillButton = () => {
    setSpringAnimation(false);
  };

  const handleResetButton = () => {
    setSpringValues({
      mass: 1,
      stiffness: 100,
      damping: 10,
      bounce: 0.5,
      duration: 1,
    });
    setSpringAnimation(false);
  };

  // Copy transition code to clipboard
  const handleCodeCopy = async (springType, language) => {
    let code = "";
    if (springType === "Physics" && language === "Motion") {
      code = `transition={{
              type: 'spring',
              mass: ${springValues.mass},
              stiffness: ${springValues.stiffness},
              damping: ${springValues.damping},
           }}`;
    } else if (springType === "Physics" && language === "SwiftUI") {
      code = `withAnimation(.interpolatingSpring(mass: ${springValues.mass}, stiffness: ${springValues.stiffness}, damping: ${springValues.damping}))`;
    } else if (springType === "Time" && language === "Motion") {
      code = `transition={{
              type: 'spring',
              bounce: ${springValues.bounce},
              duration: ${springValues.duration}, 
            }}`;
    } else {
      code = `withAnimation(.spring(bounce: ${springValues.bounce}, duration: ${springValues.duration}))`;
    }
    setCodeCopy(true);
    setTimeout(() => {
      setCodeCopy(false);
    }, 4000);
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error(error.message);
    }
    toast.custom((t) => (
      <div className="bg-secondary text-primary-foreground relative flex w-[360px] items-center justify-between rounded-[12px] p-3 text-sm shadow-[0_1px_1px_-0.5px_rgba(161,21,18,0.06),0_4px_4px_-2px_rgba(161,21,18,0.06),0_8px_8px_-4px_rgba(161,21,18,0.06),0_-1px_1px_-0.5px_rgba(161,21,18,0.06),0_-4px_4px_-2px_rgba(161,21,18,0.06),0_-8px_8px_-4px_rgba(161,21,18,0.06)]">
        <span className="font-sans">Code copied to clipboard</span>
        <Button
          variant="default"
          className="items-cente bg-primary-foreground text-primary hover:bg-foreground flex cursor-pointer justify-center rounded-[6px] px-2 py-1 font-sans font-medium select-none hover:text-white"
          onClick={() => toast.dismiss(t)}
        >
          Close
        </Button>
      </div>
    ));
  };

  const renderCodeBlock = (springTab, language) => {
    const isPhysics = springTab.springType === "Physics";
    const isTime = springTab.springType === "Time";

    if (isPhysics && language === "Motion") {
      return (
        <>
          <div className="w-full font-mono text-sm whitespace-pre-wrap">
            {`transition={{ 
  type: 'spring', 
  mass: ${springValues.mass}, 
  stiffness: ${springValues.stiffness},
  damping: ${springValues.damping},
}}`}
          </div>
        </>
      );
    }

    if (isPhysics && language === "SwiftUI") {
      return (
        <>
          <div className="w-full font-mono text-sm whitespace-pre-wrap">
            {`withAnimation(.interpolatingSpring(mass: ${springValues.mass}, stiffness: ${springValues.stiffness}, damping: ${springValues.damping}))`}
          </div>
        </>
      );
    }

    if (isTime && language === "Motion") {
      return (
        <>
          <div className="w-full font-mono text-sm whitespace-pre-wrap">
            {`transition={{ 
  type: 'spring', 
  bounce: ${springValues.bounce}, 
  duration: ${springValues.duration},
}}`}
          </div>
        </>
      );
    }

    if (isTime && language === "SwiftUI") {
      return (
        <>
          <div className="w-full font-mono text-sm whitespace-pre-wrap">
            {`withAnimation(.spring(bounce: ${springValues.bounce}, duration: ${springValues.duration}))`}
          </div>
        </>
      );
    }
  };

  // Dynamically update ballTravelDistance on window resize
  useEffect(() => {
    if (dottedLineRef.current) {
      const { width } = dottedLineRef.current.getBoundingClientRect(); // Get the width of the dotted line ref
      setBallTravelDistance(width);
    }
  }, [windowSize.width]);

  return (
    <main>
      <section className="my-12 md:mt-28">
        <Container className="@container/Create">
          <h1 className="font-heading text-3xl tracking-tight @md/Create:max-w-[25ch]">
            Make your own spring animation.
          </h1>
          <Tabs defaultValue="Physics" className="pt-4">
            <TabsList className="xs:w-[200px] w-[200px] gap-4 bg-transparent">
              {springTabs.map((springTab) => (
                <TabsTrigger
                  value={springTab.springType}
                  key={springTab.key}
                  className="data-[state=active]:text-background data-[state=active]:bg-foreground bg-neutral-100"
                >
                  <span className="relative z-20">{springTab.springType}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {springTabs.map((springTab) => (
              <TabsContent
                value={springTab.springType}
                key={springTab.key}
                className="grid grid-cols-4 gap-12 pt-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-16"
              >
                <div className="col-span-4 flex flex-col gap-8 lg:col-span-6">
                  <div className="flex flex-col gap-8">
                    {springTab.fields.map((field) => (
                      <div className="flex flex-col gap-2" key={field.key}>
                        <span className="font-sans text-sm text-black/50">
                          {field.name}
                        </span>
                        <div className="flex gap-4">
                          <Slider
                            value={[springValues[field.key]]}
                            onValueChange={(val) => {
                              /* React state should always be treated as immutable. */
                              setSpringValues((prev) => ({
                                ...prev,
                                [field.key]: val[0],
                              }));
                            }}
                            max={field.max}
                            min={field.min}
                            step={field.step}
                          ></Slider>
                          <input
                            type="text"
                            value={springValues[field.key]}
                            onChange={(e) => {
                              const input = e.target.value;
                              const validPattern = /^\d*\.?\d*$/; // Regex to only allow numbers and .

                              if (validPattern.test(input)) {
                                // Two decimal places
                                let trimmedInput = input;
                                if (input.includes(".")) {
                                  const [integerPart, decimalPart] =
                                    input.split(".");
                                  trimmedInput =
                                    integerPart + "." + decimalPart.slice(0, 2);
                                }
                                // Can't enter digit that will make the field value greater than max number
                                const numericValue = parseFloat(input);
                                if (
                                  !isNaN(numericValue) &&
                                  numericValue > field.max
                                ) {
                                  // do nothing, keep previous value
                                } else {
                                  setSpringValues((prev) => ({
                                    ...prev,
                                    [field.key]: trimmedInput,
                                  }));
                                }
                              }
                            }}
                            /* If field empty and user leaves field, default to 1 */
                            onBlur={(e) => {
                              const input = e.target.value;
                              if (input === "") {
                                setSpringValues((prev) => ({
                                  ...prev,
                                  [field.key]: "1",
                                }));
                              }
                            }}
                            placeholder="10"
                            className="h-8 w-16 rounded-[8px] border border-black/10 text-center tabular-nums placeholder:flex placeholder:items-center placeholder:justify-center"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {springAnimation ? (
                      <Button
                        className="flex-1"
                        variant="destructive"
                        onClick={() => handleKillButton()}
                      >
                        Kill animation
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        className="flex-1"
                        onClick={() => handlePlayButton()}
                      >
                        Play animation
                      </Button>
                    )}

                    <Button
                      variant="secondary"
                      onClick={() => handleResetButton()}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
                <div className="col-span-4 lg:col-span-6">
                  <div className="relative flex h-[200px] items-center justify-center overflow-hidden rounded-2xl bg-neutral-50 lg:h-full">
                    <div
                      className="animate-move relative h-[1px] w-[65%]"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--color-neutral-500), var(--color-neutral-500) 50%, transparent 50%, transparent 100%) 0 0 / 0.5rem 1px ",
                      }}
                      ref={dottedLineRef}
                    >
                      <motion.div
                        className={`bg-secondary absolute top-1/2 size-8 -translate-[16px] rounded-full`}
                        key={
                          springAnimation
                            ? `play-spring-${springTab.key} ${JSON.stringify(springValues)}`
                            : `pause-spring-${springTab.key} ${JSON.stringify(springValues)}`
                        }
                        /* key={JSON.stringify(springValues)} */
                        initial={{ x: 0 }}
                        animate={{
                          x: springAnimation ? ballTravelDistance : 0,
                        }} // Animate the ball to the width of the dotted line
                        transition={
                          springAnimation && springTab.key === "time"
                            ? {
                                type: "spring",
                                duration: springValues.duration,
                                bounce: springValues.bounce,
                                repeat: Infinity,
                                repeatType: "mirror",
                              }
                            : {
                                type: "spring",
                                stiffness: springValues.stiffness,
                                damping: springValues.damping,
                                mass: springValues.mass,
                                repeat: Infinity,
                                repeatType: "mirror",
                              }
                        }
                      ></motion.div>
                    </div>
                  </div>
                </div>

                <div className="col-span-4 flex flex-col gap-4 md:col-span-8 lg:col-span-12">
                  <Tabs defaultValue="Motion">
                    <TabsList className="xs:w-[0px] w-[0px] gap-4 bg-transparent p-0 py-2">
                      {springTab.languages.map((language) => (
                        <TabsTrigger
                          value={language}
                          key={language}
                          className="data-[state=active]:text-primary hover:text-primary p-0 data-[state=active]:bg-transparent"
                        >
                          <span className="relative z-20">{language}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {springTab.languages.map((language) => (
                      <TabsContent
                        value={language}
                        key={`${springTab.key}-${language}`}
                        className="relative w-full overflow-hidden rounded-lg bg-neutral-50 p-4 font-mono text-sm whitespace-pre"
                      >
                        {renderCodeBlock(springTab, language)}
                        <Button
                          className="absolute top-2.5 right-2.5 size-8 !p-2"
                          variant="secondary"
                          asChild
                          onClick={() =>
                            handleCodeCopy(springTab.springType, language)
                          }
                        >
                          {codeCopy ? (
                            <Check
                              size={24}
                              strokeWidth={2.5}
                              className="text-primary/50 hover:text-primary"
                            />
                          ) : (
                            <Copy
                              size={24}
                              strokeWidth={2.5}
                              className="text-primary/50 hover:text-primary"
                            />
                          )}
                        </Button>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Container>
      </section>
    </main>
  );
};

export default CreateClient;
