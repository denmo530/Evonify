"use client";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Menu } from "lucide-react";
import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

export const tags = [
  { label: "Technology", value: "technology" },
  { label: "Conference", value: "conference" },
  { label: "Workshop", value: "workshop" },
  { label: "Seminar", value: "seminar" },
  { label: "Meetup", value: "meetup" },
  { label: "Webinar", value: "webinar" },
  { label: "Concert", value: "concert" },
  { label: "Festival", value: "festival" },
  { label: "Networking", value: "networking" },
  { label: "Education", value: "education" },
  { label: "Health", value: "health" },
  { label: "Sports", value: "sports" },
  { label: "Music", value: "music" },
  { label: "Arts", value: "arts" },
  { label: "Business", value: "business" },
  { label: "Startup", value: "startup" },
  { label: "Career", value: "career" },
  { label: "Training", value: "training" },
  { label: "Community", value: "community" },
  { label: "Non-Profit", value: "non-profit" },
  { label: "Virtual", value: "virtual" },
  { label: "Outdoor", value: "outdoor" },
  { label: "Family-Friendly", value: "family-friendly" },
  { label: "Professional", value: "professional" },
  { label: "Students", value: "students" },
  { label: "Science", value: "science" },
  { label: "Literature", value: "literature" },
  { label: "Environment", value: "environment" },
  { label: "Travel", value: "travel" },
  { label: "Food", value: "food" },
  { label: "Cooking", value: "cooking" },
  { label: "Photography", value: "photography" },
  { label: "Film", value: "film" },
  { label: "Theater", value: "theater" },
  { label: "Dance", value: "dance" },
  { label: "Gaming", value: "gaming" },
  { label: "Hackathon", value: "hackathon" },
  { label: "Panel Discussion", value: "panel discussion" },
  { label: "Roundtable", value: "roundtable" },
  { label: "Product Launch", value: "product launch" },
  { label: "Sales", value: "sales" },
  { label: "Marketing", value: "marketing" },
  { label: "Finance", value: "finance" },
  { label: "Real Estate", value: "real estate" },
  { label: "Personal Development", value: "personal development" },
  { label: "Work-Life Balance", value: "work-life balance" },
  { label: "Mental Health", value: "mental health" },
  { label: "Fitness", value: "fitness" },
  { label: "Yoga", value: "yoga" },
  { label: "Meditation", value: "meditation" },
  { label: "Language Learning", value: "language learning" },
  { label: "Culture", value: "culture" },
  { label: "History", value: "history" },
  { label: "Politics", value: "politics" },
  { label: "Current Events", value: "current events" },
  { label: "Sustainability", value: "sustainability" },
  { label: "Technology Trends", value: "technology trends" },
  { label: "Innovation", value: "innovation" },
  { label: "AI", value: "ai" },
  { label: "Machine Learning", value: "machine learning" },
  { label: "Blockchain", value: "blockchain" },
  { label: "Cryptocurrency", value: "cryptocurrency" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "Cloud Computing", value: "cloud computing" },
  { label: "Data Science", value: "data science" },
  { label: "Programming", value: "programming" },
  { label: "Web Development", value: "web development" },
  { label: "Mobile Development", value: "mobile development" },
  { label: "UI/UX", value: "ui/ux" },
  { label: "Design", value: "design" },
  { label: "3D Modeling", value: "3d modeling" },
  { label: "Virtual Reality", value: "virtual reality" },
  { label: "Augmented Reality", value: "augmented reality" },
  { label: "Robotics", value: "robotics" },
  { label: "Internet of Things", value: "internet of things" },
  { label: "Automotive", value: "automotive" },
  { label: "Aerospace", value: "aerospace" },
  { label: "Biotech", value: "biotech" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Pharmaceutical", value: "pharmaceutical" },
  { label: "Legal", value: "legal" },
  { label: "Compliance", value: "compliance" },
  { label: "Logistics", value: "logistics" },
  { label: "Supply Chain", value: "supply chain" },
  { label: "E-commerce", value: "e-commerce" },
  { label: "Retail", value: "retail" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Tourism", value: "tourism" },
  { label: "Media", value: "media" },
  { label: "Journalism", value: "journalism" },
  { label: "Publishing", value: "publishing" },
  { label: "Advertising", value: "advertising" },
  { label: "Public Relations", value: "public relations" },
  { label: "Communications", value: "communications" },
  { label: "Fundraising", value: "fundraising" },
  { label: "Volunteering", value: "volunteering" },
  { label: "Social Impact", value: "social impact" },
  { label: "Diversity", value: "diversity" },
  { label: "Inclusion", value: "inclusion" },
  { label: "Equality", value: "equality" },
  { label: "Advocacy", value: "advocacy" },
  { label: "Policy", value: "policy" },
];

export type TagSelectValue = {
  label: string;
  value: string;
};

interface TagSelectProps {
  form: any;
}

export function TagsInput({ form }: TagSelectProps) {
  const animatedComponents = makeAnimated();

  return (
    <div>
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <>
            <FormItem>
              <FormControl>
                <Select
                  className="my-react-select-container"
                  classNamePrefix="my-react-select"
                  isClearable
                  isSearchable
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  placeholder="Select tags"
                  isMulti
                  value={field.value}
                  onChange={field.onChange}
                  options={tags}
                  formatOptionLabel={(option: any) => {
                    return (
                      <div className="flex items-center gap-3 text-primary">
                        <div>{option.label}</div>
                      </div>
                    );
                  }}
                  menuPlacement="top"
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 50,
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      maxHeight: 200,
                      overflowY: "auto",
                      display: "inline-block",
                    }),
                  }}
                />
              </FormControl>
            </FormItem>
          </>
        )}
      />
    </div>
  );
}
