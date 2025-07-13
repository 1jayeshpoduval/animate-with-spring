"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import tabsData from "@/data/tabsData";
import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

const TabsClient = ({ className }) => {
  const [activeTab, setActiveTab] = useState(tabsData[0]);

  const handleTabClick = (tabLabel) => {
    const clickedTab = tabsData.find(
      (tabData) => tabData.tabLabel === tabLabel,
    );

    if (clickedTab) {
      setActiveTab(clickedTab);
    }
  };

  return (
    <Tabs defaultValue={activeTab.tabLabel} className={className}>
      <TabsList>
        {tabsData.map((tabData, index) => (
          <Link href={tabData.tabUrl} key={index} className="flex flex-1">
            <TabsTrigger
              value={tabData.tabLabel}
              onClick={() => handleTabClick(tabData.tabLabel)}
            >
              {/* The moving tab highlighter */}
              {activeTab.tabLabel === tabData.tabLabel && (
                <motion.div
                  layoutId="active-tab"
                  transition={{
                    type: "spring",
                    duration: 0.23,
                    bounce: 0.12,
                  }}
                  className="bg-primary-foreground absolute inset-0 rounded-sm shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_1px_-0.5px_rgba(0,0,0,0.06),0_2px_2px_-1px_rgba(0,0,0,0.06),0_4px_4px_-2px_rgba(0,0,0,0.06)]"
                />
              )}
              <span className="relative z-10">{tabData.tabLabel}</span>
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TabsClient;
