export class UpdatePasswordDto {
    userId: string = '';
    resetToken: string = '';
    email: string = '';    
    password: string = '';
    confirmPassword: string = '';
}