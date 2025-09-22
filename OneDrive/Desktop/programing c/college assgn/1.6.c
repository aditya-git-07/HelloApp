#include<stdio.h>
int main()
{
    int age;
    float weight;
    double height;

    printf("Enter age of student (in years):");
    scanf("%d", &age);
    printf("Enter weight of student (in grams):");
    scanf("%f", &weight);
    printf("Enter height of student (in cm):");
    scanf("%lf", &height);
    
    printf("Age into Months: %d\n", age * 12);
    printf("Weight into Kilograms: %f\n", weight / 1000);
    printf("Height into Meters: %lf\n", height / 100);

    return 0;
}