import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Header = ()=>{ return (
<header className="top-0 z-50 bg-transparent mb-10 wrapper-nav  ">
<div className="flex items-center  justify-between ">
  <div className="flex space-x-10 items-center">
  <div>
    <Image
      className="w-auto"
      src="/logo.png"
      width={94}
      height={32}
      priority={true}
      alt="logo"
    />
  </div>
  <div className=" items-center hidden lg:flex ">
<SearchBar />
<Input placeholder="Neighborhood,city or zip" />
</div> </div>
  <div className="flex p-2 items-center ml-2 gap-x-2">
    <Button variant={"ghost"}>Log in</Button>
    <Button className="bg-emerald-600  ">Sign up</Button>
  </div>
</div>
<div className="flex items-center lg:hidden">
  <SearchBar />
</div>
</header>   ) }
export default Header;