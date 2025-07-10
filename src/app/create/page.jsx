"use client";
import React, { useState, useEffect, useRef } from "react";
import Container from "@/components/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import springTabs from "@/data/springTabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import useWindowSize from "@/hooks/useWindowSize";

const Create = () => {
  const [ballTravelDistance, setBallTravelDistance] = useState(0);
  const dottedLineRef = useRef();
  const windowSize = useWindowSize(); // Dynamic window resize hook
  // For dynamically updating sliders
  const [springValues, setSpringValues] = useState({
    mass: 1,
    stiffness: 100,
    damping: 10,
    bounce: 0.5,
    duration: 1,
  });

  const [springAnimation, setSpringAnimation] = useState(false);

  const handleButtonClick = () => {
    setSpringAnimation(!springAnimation);
  };

  const handleResetClick = () => {
    setSpringValues({
      mass: 1,
      stiffness: 100,
      damping: 10,
      bounce: 0.5,
      duration: 1,
    });
    setSpringAnimation(false);
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
      <section className="py-8">
        <Container className="@container/Create">
          <h1 className="font-sans text-2xl font-semibold tracking-tight @md/Create:max-w-[30ch]">
            Make your own spring animation.
          </h1>
          <Tabs defaultValue="Physics" className="pt-8">
            <TabsList className="xs:w-[200px] gap-4 bg-transparent">
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
                className="grid grid-cols-4 gap-16 pt-4 md:grid-cols-8 lg:grid-cols-12"
              >
                <div className="col-span-4 flex flex-col gap-10 lg:col-span-6">
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

                              // If input empty, make it '1'
                              if (input === "") {
                                setSpringValues((prev) => ({
                                  ...prev,
                                  [field.key]: "1",
                                }));
                              } else if (validPattern.test(input)) {
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
                            placeholder="20"
                            className="h-8 w-16 rounded-[8px] border border-black/10 text-center tabular-nums placeholder:flex placeholder:items-center placeholder:justify-center"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button
                      className="flex-1"
                      variant="default"
                      onClick={() => handleButtonClick()}
                    >
                      {springAnimation ? "Kill" : "Play"} animation
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleResetClick()}
                    >
                      Reset to default
                    </Button>
                  </div>
                </div>
                <div className="col-span-4 lg:col-span-6">
                  <div className="relative flex h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-neutral-50 lg:h-full">
                    <div
                      className="relative h-[1px] w-[65%] bg-[url('/dotted-line.svg')] bg-repeat"
                      ref={dottedLineRef}
                    >
                      <motion.div
                        className={`bg-secondary absolute top-1/2 size-8 -translate-[16px] rounded-sm`}
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
              </TabsContent>
            ))}
          </Tabs>
        </Container>
      </section>
    </main>
  );
};

export default Create;
