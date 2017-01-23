library("rjson")
js<-fromJSON(file="test.json")

png('packingEff.png')
h=hist(js$packingEff,plot=TRUE,xlab="Packing Eff.",col="red",main="REP3")
curve(dnorm(x,mean=mean(js$packingEff),sd=sd(js$packingEff)),add=TRUE,lwd=2)
dev.off()

png('timeTaken.png')
h=hist(js$timeTaken,breaks=c(1e6,2e6,3e6,4e6,5e6,1e9),plot=TRUE,xlab="Time Taken (ns)",col="blue",main="REP3")
curve(dnorm(x,mean=mean(js$timeTaken),sd=sd(js$timeTaken)),add=TRUE,lwd=2)

dev.off()