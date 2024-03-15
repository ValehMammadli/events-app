"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { eventFormSchema } from "@/lib/validator"
import { eventDefaultValues } from "@/constants"
type EventFormProps  = {
userId:string,
type:"Create" | "Update" 

}

const EventForm = ({userId,type}:EventFormProps) => {
const initialValues= eventDefaultValues
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof  eventFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
  return (
    <div>EventForm {type}</div>
  )
}

export default EventForm