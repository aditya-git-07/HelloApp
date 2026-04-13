public class UC5 {
    public static void main(String[] args) {

        System.out.println("Args length: " + args.length);

        if (args.length == 0) {
            System.out.println("Hello, World!");
        } else {
            // handle both cases (1 string or multiple args)
            String[] names = (args.length == 1)
                    ? args[0].split("[,\\s]+")
                    : args;

            System.out.print("Hello ");
            int count = 0;

            for (String name : names) {
                System.out.print(name);
                count++;
                if (count < names.length) {
                    System.out.print(", ");
                }
            }
        }
    }
}