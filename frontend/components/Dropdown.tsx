import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react"
import { ICategory } from "../../backend/models/CategoryModel"
 type  DropdownProps = {
    value?:string,
    onChangeHandler?: ()=>void
 }
const Dropdown = ({value,onChangeHandler}:DropdownProps) => {
    const [categories,setCategories]= useState<ICategory[]>([])
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Category" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="light">Light</SelectItem>
      <SelectItem value="dark">Dark</SelectItem>
      <SelectItem value="system">System</SelectItem>
    </SelectContent>
  </Select>
  )
}

export default Dropdown