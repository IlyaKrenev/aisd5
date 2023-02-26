
class Main {
    private binSearchTree: BinSearchTree = new BinSearchTree();
    private redBlackTree: RedBlackTree = new RedBlackTree();
    private avlTree: AVLTree = new AVLTree();

    private amount = 50000;
    private isDefaultRand: boolean = false;

    constructor () {
        document.querySelector('.calc')?.addEventListener('click', () => {
            this.initTrees();
        })
    }

    private initTrees () {
        const numbers: number[] = [];
        const isDefaultCB = (document.querySelector('#defaultSort') as HTMLInputElement)?.checked
        const amount = (document.querySelector('#amount') as HTMLInputElement)?.value

        if (isDefaultCB !== undefined) {
            this.isDefaultRand = isDefaultCB;
        }

        if (amount !== undefined && amount !== '') {
            this.amount = Number(amount);
        }

        for (let i = 0; i < this.amount; i++) {
            numbers.push(this.isDefaultRand ? this.defaultRand() : this.exponentialRand(numbers.length));
        }

        this.binSearchTree = new BinSearchTree();
        this.redBlackTree = new RedBlackTree();
        this.avlTree = new AVLTree();

        this.initBinSearchTree(numbers);
        this.initRedBlackTree(numbers);
        this.initAVLTree(numbers);
    }

    private defaultRand () {
        return Math.random();
    }

    private exponentialRand (rate: number) {
        const U = Math.random();

        return -Math.log(U)/(rate + 1);
    }

    private initBinSearchTree (numbers: number[]) {
        const startTime = new Date().getTime();

        numbers.forEach((num) => {
            const treeNode = new RBNode(num);

            this.binSearchTree.insertNode(treeNode)
        })

        const finishTime = new Date().getTime();

        if (this.isDefaultRand) {
            console.log(`Время выполнения для равномерного распределения ${this.amount} элементов =`, finishTime - startTime, 'ms');
        } else {
            console.log(`Время выполнения для эксп. распределения ${this.amount} элементов =`, finishTime - startTime, 'ms');
        }

        console.log(`Бинарное дерево`, this.binSearchTree);
        console.log(`Длина: `, this.binSearchTree.size());
        console.log();
    }

    private initRedBlackTree (numbers: number[]) {
        const startTime = new Date().getTime();

        numbers.forEach((num) => {
            const treeNode = new RBNode(num);

            this.redBlackTree.insertNode(treeNode);
        })

        const finishTime = new Date().getTime();

        if (this.isDefaultRand) {
            console.log(`Время выполнения для равномерного распределения ${this.amount} элементов =`, finishTime - startTime, 'ms');
        } else {
            console.log(`Время выполнения для эксп. распределения ${this.amount} элементов =`, finishTime - startTime, 'ms');
        }

        console.log(`РБ дерево`, this.redBlackTree);
        console.log(`Длина: `, this.redBlackTree.size());
        console.log();
    }

    private initAVLTree (numbers: number[]) {
        const startTime = new Date().getTime();

        let root = null;

        numbers.forEach((num) => {
            const treeNode = new AVLNode(num);

            root = this.avlTree.insert(root, num);
        })

        const finishTime = new Date().getTime();

        if (this.isDefaultRand) {
            console.log(`Время выполнения для равномерного распределения ${this.amount} элементов =`, finishTime - startTime, 'ms');
        } else {
            console.log(`Время выполнения для эксп. распределения ${this.amount} элементов =`, finishTime - startTime, 'ms');
        }

        console.log(`АВЛ дерево`, this.avlTree);
        console.log(`Длина: `, this.avlTree.size(root));
        console.log();
    }
}

new Main();
