import { Schema, model } from 'mongoose';

const StaffSkillSchema = new Schema(
  {
    techStackId: { type: Schema.Types.ObjectId, ref: 'TechStack' },
    level: String,
  },
  { _id: false }
);

const StaffExpSchema = new Schema(
  {
    staffId: Schema.Types.ObjectId,
    skills: {
      type: [StaffSkillSchema],
    },
    projectsId: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  },
  {
    timestamps: true,
  }
);

export default model('StaffExp', StaffExpSchema, 'staff-experiences');
