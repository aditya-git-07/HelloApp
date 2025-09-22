#include<stdio.h>
int main()
{
    int quiz1, quiz2, quiz3;
    printf("===========Quizzes===========\n");
    printf("Enter the score of the first quiz: ");
    scanf("%d",&quiz1);
    printf("Enter the score of the second quiz: ");
    scanf("%d",&quiz2);
    printf("Enter the score of the third quiz: ");
    scanf("%d",&quiz3);

    int mid1;
    printf("===========Mid-term===========\n");
    printf("Enter the score of mid term: ");
    scanf("%d",&mid1);

    int fin1;
    printf("===========Final===========\n");
    printf("Enter the score of final exam: ");   
    scanf("%d",&fin1);

    printf("Quiz total: %d",quiz1+quiz2+quiz3);
    printf("\nMid-term: %d",mid1);
    printf("\nFinal: %d",fin1);   

    printf("\n..........................\n");
    printf("Total: %d",quiz1+quiz2+quiz3+mid1+fin1);


}