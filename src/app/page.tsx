"use client"

import ArticleCard from "@/components/Article";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useAppSelector } from "@/lib/redux/hook";



interface IArticle {

  objectId: string;
  title: string;
  thumbnail: string;
  content: string;
  category: string;

}


export default function Home() {

  const isLogin = useAppSelector((state) => state.accountReducer.isLogin);

  const router = useRouter();

  const [articles, setArticles] = useState<IArticle[]>([])

  async function getArticle() {
    try {
      const response = await axios.get("https://magicalteeth-us.backendless.app/api/data/article")
      setArticles(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    
    getArticle();

  }, [isLogin]);




  return (
    <div className="bg-neutral-700 min-h-screen">

      <div className="flex justify-center space-y-12 space-x-6">
        {isLogin ? (
          <Button type="button"
            onClick={() => router.push("/dashboard")}>
            Dashboard</Button>
        ) : (
          <>
            <Button type="button"
              onClick={() => router.push("/signup")}>
              Sign Up</Button>
            <Button type="button"
              onClick={() => router.push("/signin")}>
              Sign In</Button>
          </>
        )
        }
      </div>





      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
        {articles.map((value) => (
          <ArticleCard
            key={value.objectId}

            title={value.title}
            thumbnail={value.thumbnail}
            content={value.content}
            category={value.category}
          />
        ))}
      </div>


    </div>

  );
}
