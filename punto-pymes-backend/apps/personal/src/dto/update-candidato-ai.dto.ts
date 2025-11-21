import { IsString, IsOptional, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class UpdateCandidatoAIDto {
    @IsInt()
    @Min(0)
    @Max(100)
    aiScore: number;

    @IsString()
    @IsNotEmpty()
    aiAnalysis: string;
}