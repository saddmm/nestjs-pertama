import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({unique: true})
    name: string

    @Prop({required: true, unique: true})
    email: string

    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)