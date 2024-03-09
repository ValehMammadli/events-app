import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function Home() {
  return (
   <div className="flex flex-col md:flex-row w-full">
<div className="space-y-6 w-full lg:w-7/12">
  <h1 className="text-3xl font-bold lg:text-4xl lg:leading-[3.25rem] font-my-heading-font ">The people platform—Where interests become friendships</h1>
  <p className="">Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Meetup. Events are happening every day—sign up to join the fun.</p>
  <Button>Join Meetup</Button>
</div>
<div className="w-8/12 lg:w-1/2 mx-auto">
  <Image src="/hero.svg" alt="hero" width={379} height={269}/>
</div>
   </div>
  );
}
