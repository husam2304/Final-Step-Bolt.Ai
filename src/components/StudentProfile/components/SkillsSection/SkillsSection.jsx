import React from "react";
import SectionCard from "../../shared/SectionCard";
import SkillTag from "../../shared/SkillTag";
import TagIcon from "@mui/icons-material/Tag";

const SkillsSection = ({ techSkills }) => {
  return (
    <div className="w-max">
      {/* Technical Skills */}
      <SectionCard title="المهارات التقنية" icon={<TagIcon />}>
        <div className="flex  justify-center ">
          {techSkills.map((skill, index) => (
            <SkillTag key={index} text={skill} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default SkillsSection;
