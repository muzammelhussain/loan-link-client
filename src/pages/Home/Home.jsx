import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

import HeroSection from "./HomeSections/HeroSection";
import AvailableLoans from "./HomeSections/AvailableLoans";
import HowItWorks from "./HomeSections/HowItWorks";
import FeedbackCarousel from "./HomeSections/FeedbackCarousel";
import FeaturesSection from "./HomeSections/FeaturesSection";
import CtaSection from "./HomeSections/CtaSection";
import Services from "./HomeSections/Services";
import Categories from "./HomeSections/Categories";
import Highlights from "./HomeSections/Highlights";
import Statistics from "./HomeSections/Statistics";
import Blogs from "./HomeSections/Blogs";
import Newsletter from "./HomeSections/Newsletter";
import FAQ from "./HomeSections/FAQ";

const Home = () => {
  const axiosInstance = useAxios();

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["available-loans"],
    queryFn: async () => {
      const res = await axiosInstance.get("/loans/latest");
      return res.data;
    },
  });
  if (isLoading)
    return <span className="loading loading-dots loading-xl"></span>;

  return (
    <div>
      <HeroSection />
      <AvailableLoans loans={loans} />
      <HowItWorks />
      <Services></Services>
      <Categories></Categories>
      <Highlights></Highlights>
      <Statistics></Statistics>
      <Blogs></Blogs>
      <Newsletter></Newsletter>
      <FeedbackCarousel />
      {/* <FeaturesSection /> */}
      <CtaSection />
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
