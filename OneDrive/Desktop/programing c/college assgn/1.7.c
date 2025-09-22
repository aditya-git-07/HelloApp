#include<stdio.h>
int main()
{
    long int hours, minutes, seconds;
    printf("Input hours:");
    scanf("%d",&hours);
    printf("Input minutes: ");
    scanf("%d",&minutes);
    printf("Input seconds: ");  
    scanf("%d",&seconds);

    printf("\nTotal seconds: %d", (hours * 3600) + (minutes * 60) + seconds);
    printf(" seconds");
    return 0;
} 