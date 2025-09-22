#include<stdio.h>
int main()
{ 
    int x,y,s,p;
    printf("x=");
    scanf("%d",&x);
    printf("y=");
    scanf("%d",&y);
    p=x*y;
    
    s=x+y;
    
    printf("total=%d\n",s+p*(s-x)*(p+y));

}