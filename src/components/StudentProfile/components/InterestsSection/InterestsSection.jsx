import React from "react";
import SectionCard from "../../shared/SectionCard";
import SkillTag from "../../shared/SkillTag";

const InterestsSection = ({ interests }) => {
  return (
    <SectionCard title="المجالات المهتم بها" icon="💡">
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <SkillTag key={index} text={interest} />
        ))}
      </div>
    </SectionCard>
  );
};

export default InterestsSection;