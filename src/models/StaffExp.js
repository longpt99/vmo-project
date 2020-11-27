import { Schema, model } from 'mongoose';

const StaffExpSchema = new Schema(
  {
    staffId: Schema.Types.ObjectId,
    exp: Date,
    skills: {
      type: [{ techId: Schema.Types.ObjectId, exp: Date }],
      default: [],
    },
    projectsId: { type: [Schema.Types.ObjectId], default: [] },
  },
  {
    timestamps: true,
  }
);

export default model('StaffExp', StaffExpSchema, 'staffsExperience');
