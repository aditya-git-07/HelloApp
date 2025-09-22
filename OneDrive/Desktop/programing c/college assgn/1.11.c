#include<stdio.h>
int main()
{
    int s,cp,pp,profit;
    printf("The number of shares the investor purchased: ");
    scanf("%d",&s);
    printf("The price of the stock(per share) when the investor purchased it: ");
    scanf("%d",&cp);
    printf("the price of the stock per share now: ");
    scanf("%d",&pp);
    profit=(s*pp)-(s*cp);
    printf("You have made a profit of $%d",profit);
    printf(" you bought %d",s);
    printf(" share of this stock.\n");
    return 0;
}