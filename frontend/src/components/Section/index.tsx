import React, { useEffect, useState, ReactNode } from "react";
import MockOnePagerData from "@/data/MockOnePagerData";
import { API_URL } from "@/data/ApiData";
import axios from "axios";
import Navbar from "../Navbar";



export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-2xl mx-auto">{children}</div>
    </section>
  );
}








