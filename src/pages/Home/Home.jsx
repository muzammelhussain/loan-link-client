import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

import HeroSection from "./HomeSections/HeroSection";
import AvailableLoans from "./HomeSections/AvailableLoans";
import HowItWorks from "./HomeSections/HowItWorks";
import FeedbackCarousel from "./HomeSections/FeedbackCarousel";
import FeaturesSection from "./HomeSections/FeaturesSection";
import CtaSection from "./HomeSections/CtaSection";

const Home = () => {
  const axiosInstance = useAxios();

  const { data: loans = [] } = useQuery({
    queryKey: ["available-loans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/loans/latest");
      return res.data;
    },
  });

  return (
    <div>
      <HeroSection />
      <AvailableLoans loans={loans} />
      <HowItWorks />
      <FeedbackCarousel />
      <FeaturesSection />
      <CtaSection />
    </div>
  );
};

export default Home;
