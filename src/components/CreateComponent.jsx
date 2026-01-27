import React, { useState } from "react";
import { addIcon } from "../images";
import Dialogue from "./ResubaleComponents/Dialogue";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const CreateComponent = (props) => {
  const handleChange = (name, value) => {
    props?.setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Button
        onClick={() => props?.setIsModalOpen(true)}
        className="flex items-center gap-3 py-2 px-3 bg-primary hover:bg-primary rounded-md cursor-pointer"
      >
        <img src={addIcon} alt="add" className="w-4 h-4" />
        <span className="text-sm font-semibold text-white">Create</span>
      </Button>

      <Dialogue
        header="Create Enterprise Risk"
        open={props?.isModalOpen}
        onOpenChange={props?.setIsModalOpen}
      >
        <form
          onSubmit={props?.handleSubmit}
          className="grid grid-cols-2 gap-4 mt-4"
        >
          {props?.riskFormFields.map((field) => (
            <div
              key={field?.name}
              className={field?.span === 2 ? "col-span-2" : ""}
            >
              <label className="text-sm font-medium">{field?.label}</label>

              {field?.type === "select" ? (
                <Select
                  value={props?.form[field?.name]}
                  onValueChange={(v) => handleChange(field?.name, v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${field?.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field?.options?.map((opt) => (
                      <SelectItem key={opt?.value} value={opt?.value}>
                        {opt?.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type="text"
                  placeholder={field?.placeholder}
                  value={props?.form[field?.name]}
                  onChange={(e) => handleChange(field?.name, e.target.value)}
                />
              )}
            </div>
          ))}

          <div className="col-span-2 flex justify-end  pt-4">
            <Button type="submit" className="bg-primary hover:bg-[#cf6602] cursor-pointer">
              Create Risk
            </Button>
          </div>
        </form>
      </Dialogue>
    </>
  );
};

export default CreateComponent;
