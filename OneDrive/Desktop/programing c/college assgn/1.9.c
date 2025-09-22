#include<stdio.h>
int main()
{
    int c,f;
    printf("Input the temperature in Celsius:");
    scanf("%d",&c);
    f=(c*9/5)+32;
    printf("Temperature in Fahrenheit: %d",f);
    return 0;

}