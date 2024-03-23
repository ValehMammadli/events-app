"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { eventFormSchema } from "@/lib/validator"
import { eventDefaultValues } from "@/constants"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Dropdown from "./Dropdown"
import { Textarea } from "./ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import DatePicker from "react-datepicker";
import Image from "next/image"
import "react-datepicker/dist/react-datepicker.css";
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { Router } from "next/router"
type EventFormProps  = {
userId:string,
type:"Create" | "Update" 

}

const EventForm = ({userId,type}:EventFormProps) => {
  const [files, setFiles] = useState<File[]>([])
const initialValues= eventDefaultValues
const router = useRouter();
const { startUpload } = useUploadThing('imageUploader')
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof  eventFormSchema>) {
        let uploadedImageUrl = values.imageUrl;

    if(files.length > 0) {
      const uploadedImages = await startUpload(files)

      if(!uploadedImages) {
        return
      }

      uploadedImageUrl = uploadedImages[0].url
    }
    if(type === 'Create') { try{
      const formattedData = {...values,  imageUrl : uploadedImageUrl};

      const response = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData)
      });
      const json = await response.json()
      if (response.ok) {
        console.log('new event added:', json)
          router.push('/'); // Or another success redirection
      } else {
          
          console.error('Event creation failed:', json.error);
          // Handle errors, display messages to the user
      }
  } catch (error) {
      console.error('Error submitting form:', error);
      // Handle network errors and other unexpected issues
  }
}
    }

      
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Event title" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                <FileUploader 
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Image
                        src="/location-grey.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                      />

                      <Input placeholder="Event location or Online" {...field} className="input-field" />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-gray-500">Start Date:</p>
                      <DatePicker 
                        selected={field.value} 
                        onChange={(date: Date) => field.onChange(date)} 
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        
          <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center  h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-gray-600">End Date:</p>
                      <DatePicker 
                        selected={field.value} 
                        onChange={(date: Date) => field.onChange(date)} 
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

      <Button type="submit" className="bg-purple-500 rounded-full w-full" 
      size="lg" disabled={form.formState.isSubmitting}> {form.formState.isSubmitting ? (
        'Submitting...'
      ): `${type} Event `}</Button>
    </form>
  </Form>
  )
}

export default EventForm