"use client";

import { useEffect, useRef } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hook";



export default function DashboardPage() {

  const inTitleRef = useRef<HTMLInputElement>(null);
  const inThumbnailRef = useRef<HTMLInputElement>(null);
  const inContentRef = useRef<HTMLInputElement>(null);
  const inCategoryRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isLogin = useAppSelector((state) => state.accountReducer.isLogin);

  useEffect(() => {   //BUAT VALIDASI UDH LOGIN BELOM
    if (!isLogin) {
      router.push("/");
    }

  }, [isLogin]);


  async function UploadArticle() {


    try {
      if (
        inTitleRef.current?.value === "" ||
        inThumbnailRef.current?.value === "" ||
        inContentRef.current?.value === "" ||
        inCategoryRef.current?.value === ""
      ) {
        alert("Isi semua form");
        return;
      }

      const response = await axios.post(
        "https://magicalteeth-us.backendless.app/api/data/article",
        {
          title: inTitleRef.current?.value,
          thumbnail: inThumbnailRef.current?.value,
          content: inContentRef.current?.value,
          category: inCategoryRef.current?.value,
        }
      );

      console.log(response.data);
      alert("Upload berhasil!");
      
      router.push("/");

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <p>Welcome</p>

      <Card className="w-[30rem] mx-auto mt-36">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Input Article</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-2xl">Title</Label>
              <Input placeholder="input title" ref={inTitleRef} />
            </div>

            <div>
              <Label className="text-2xl">Thumbnail</Label>
              <Input placeholder="input thumbnail" ref={inThumbnailRef} />
            </div>

            <div>
              <Label className="text-2xl">Content</Label>
              <Input placeholder="input content" ref={inContentRef} />
            </div>

            <div>
              <Label className="text-2xl">Category</Label>
              <Input placeholder="input category" ref={inCategoryRef} />
            </div>

            <Button type="button" onClick={UploadArticle}>
              Upload
            </Button>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
