library("rjson")
js<-fromJSON(file="BF.json")

png('BFpackingEff.png')
h=hist(js$packingEff,plot=TRUE,xlab="Packing Eff.",col="red",main="BF")
curve(dnorm(x,mean=mean(js$packingEff),sd=sd(js$packingEff)),add=TRUE,lwd=2)
dev.off()

png('BFtimeTaken.png')
h=hist(js$timeTaken,plot=TRUE,xlab="Time Taken (ns)",col="blue",main="BF")
curve(dnorm(x,mean=mean(js$timeTaken),sd=sd(js$timeTaken)),add=TRUE,lwd=2)

dev.off()