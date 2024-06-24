"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Configuration from "./components/Configuration";
import TeamMembers from "./components/TeamMembers";
import Commits from "./components/Commits";
import Activities from "./components/Activities";
import Kanban from "./components/Kanban";
import { Activity, GitCommitHorizontal, Kanban as KanbanIcon, Settings2, Users } from "lucide-react";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Board from "./components/Board";

const Dashboard: React.FC = ({ mainData }: any) => {
  const data = [
    { icon: <Settings2 />, title: "Configuration" },
    { icon: <Users />, title: "Team Members" },
    { icon: <GitCommitHorizontal />, title: "Commits" },
    { icon: <Activity />, title: "Activities" },
    { icon: <KanbanIcon />, title: "Kanban" },
  ];

  const componentMap: { [key: string]: JSX.Element } = {
    "Configuration": <Configuration projectId={"123"} />,
    "Team Members": <TeamMembers />,
    "Commits": <Commits />,
    "Activities": <Activities />,
    "Kanban": <Kanban />,
  };

  const [selectedTab, setSelectedTab] = useState<string>("Configuration");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const footer = document.querySelector('Footer') as HTMLElement;
    if (footer) {
        footer.style.display = 'none';
    }
  }, []);


  return (
    <div className="h-[93vh] lg:h-[90vh] w-full h-screen bg-[#0D1117] flex">
      <Sidebar tabData={data} handleTabClick={handleTabClick} selectedTab={selectedTab} />
      <Board boardData={componentMap[selectedTab]} />
    </div>
  );
};

export default Dashboard;