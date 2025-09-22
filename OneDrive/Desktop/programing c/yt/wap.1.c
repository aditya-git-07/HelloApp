#include<stdio.h>
int main()
{
    float r,a;
    printf("Enter the radius of the circle:\n");
    scanf("%f",&r);
    a= (3.14*r*r) ;
    printf("Area of the circle is: %.2f",a);
    return 0;
}