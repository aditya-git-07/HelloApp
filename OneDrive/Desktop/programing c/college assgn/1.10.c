#include<stdio.h>
int main()
{ 
    const int cv=32;
    int c,f;
    printf("Input the temperature in Celsius: ");
    scanf("%d",&c);
    f=(c*9/5)+cv;
    printf("Temperature in Fahrenheit: %d\n",f);
    return 0;

}