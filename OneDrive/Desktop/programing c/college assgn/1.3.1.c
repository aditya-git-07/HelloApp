#include<stdio.h>
int main()
{
    int choice;
    printf("#########################################################################################\n");
    printf("                                    Welcome!                                             \n");
    printf("Please choose a number from the following options: (1,2,3) \n");
    scanf("%d", &choice);
    if (choice==1) printf("1.   Play the game!\n");
    else if (choice==2) printf("2.   Demo the game!\n");
    else if (choice==3) printf("3.   Exit\n");
    else printf("INVALID OPTION SELECTED \n");
    printf("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
}
