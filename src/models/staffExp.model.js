import { Schema, model } from 'mongoose';

const StaffExpSchema = new Schema(
  {
    staffId: Schema.Types.ObjectId,
    skills: {
      type: [{ techStackId: Schema.Types.ObjectId, exp: Date }],
    },
    projectsId: [Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

export default model('StaffExp', StaffExpSchema, 'staff-experiences');
