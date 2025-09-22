#include<stdio.h>
int main()
{
    char name[100];
    char reg_no[50];
    int age;
    float weight;
    double height;
    float cgpa;

    printf("Enter name of student:");
    scanf("%s",name);
    printf("Roll number:");
    scanf("%s",reg_no);
    printf("Age:");
    scanf("%d",&age);
    printf("Weight (in kg):");
    scanf(" %f",&weight);
    printf("Height (in meters):");
    scanf(" %lf",&height);   
    printf("CGPA:");
    scanf("%f",&cgpa);
    return 0;    
}